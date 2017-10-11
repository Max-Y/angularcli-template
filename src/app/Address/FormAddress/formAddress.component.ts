/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component, ViewChild, ViewContainerRef, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { NgForm } from '@angular/forms';

// Module
import { BrowserModule } from '@angular/platform-browser';
import { AddressViewModel, AddressOptionalViewModel, PhoneAndMailViewModel } from '../ViewModels';
import { ModuleEnum } from '../../Models';

// Component
import { DropdownComponent, DropdownValueModel } from '../../Shared';

// Service
import { AddressService, CityService, CountryService, ContactInformationService, AddressModuleService } from '../Service';
import { ErrorService } from '../../Service';


/**
 * @Component FormAddressComponent
 *
 * @stable
 */
interface IFormAddressComponent {
    /**
     * @interface IFormAddressComponent
     *
     * 
     * @description
     * 
     * 3 functionals parts:
     * - Phone and mail part
     * - Address
     * - Adress Optional
     * 
     * Components used:
     * - DropdownComponent
     * - Alert
     * 
     * Directive used:
     * - Tooltip
     * 
     * Service used:
     * - AddressService
     * - CityService
     * - CountryService
     * - ContactInformationService
     * 
     * Model used:
     * - AddressViewModel
     * - AddressOptionalViewModel
     * - PhoneAndMailViewModel
     *
     */

     /**
     * @method backReinscritpion
     * used on Reinscription module to back on the right step and keep data
     */
      backReinscritpion();

    /**
     * @method submitReinscritpion
     * used on Reinscription module to validate the form, keep data and to go to the next step
     */
      submitReinscritpion();

    /**
     * @method submitAddress
     * used on Address module to validate the form and submit data
     */
      submitAddress();
}
@Component({
  moduleId: module.id,
  selector: 'un-form-address',
  templateUrl: './formAddress.component.html'
})
export class FormAddressComponent implements IFormAddressComponent  {
  // Dropdown default title
  private _defaulTitleCityDropdown: string = 'Choississez une ville';
  private _defaulTitleCountryDropdown: string = 'Choississez un pays';
  private _defaultCountryDropdown: string = '100';
  public isFrenchCountry: boolean;
  public isFrenchCountryOptional: boolean

  // Alert msg
  public alerts: any = [{msg: ``}];
  public alertHidden: boolean;
  public titleAlert: string;
  public type: string;
  private _titleError404: string = 'Service indisponible! Nous sommes désolés de ce désagrément, réessayez plus tard. Si le problème persiste, contactez les services de la scolarité.';
  private _titleErrorForm: string = 'Le formulaire est invalide';


  // Alert msg, send at previous view (Only on reinscription module)
  @Output() error: EventEmitter<string> = new EventEmitter<string>();
  private _titleErrorCountry: string = 'Une erreur est survenue lors du chargement des pays! Nous sommes désolés de ce désagrément, réessayez plus tard. Si le problème persiste, contactez les services de la scolarité.';
  private _titleErrorCity: string = 'Une erreur est survenue lors du chargement des villes! Nous sommes désolés de ce désagrément, réessayez plus tard. Si le problème persiste, contactez les services de la scolarité.';
  private _titleErrorForms: string = 'Une erreur est survenue lors du chargement de votre adresse! Nous sommes désolés de ce désagrément, réessayez plus tard. Si le problème persiste, contactez les services de la scolarité.';
  private _titleSuccessForm: string = 'Vos adresses ont bien été enregistrées.';

  // Dropdown lenght of zipcode
  public maxLengthOptionalZipcode:number;
  public maxLengthZipcode:number;
  private _lengthFrenchZicope: number = 5;
  private _lengthOtherZicope: number = 10;


  // DOM Elements
  public dropdownCity: Array<DropdownValueModel>;
  public dropdownCityOptional: Array<DropdownValueModel>;
  public dropdownCountry: Array<DropdownValueModel>;
  public dropdownAddress: Array<DropdownValueModel>;
  public nameButton: string;
  public isAddressOptionalHidden: boolean;


  // Model Elements
  public addressViewModel: AddressViewModel;
  public addressOptionalViewModel: AddressOptionalViewModel;
  public phoneAndMailViewModel: PhoneAndMailViewModel;


  // Validation du form dropdownOnSubmit
  private _isValidForm: boolean;
  public addressNumberValid: boolean = true;
  public addressNumberOptionalValid: boolean = true;


  // Component Dropown
  @ViewChild('cities') private _dropdownCityView:DropdownComponent;
  @ViewChild('countries') private _dropdownCountryView:DropdownComponent;
  @ViewChild('citiesOptional') private _dropdownCityOptionalView:DropdownComponent;
  @ViewChild('countriesOptional') private _dropdownCountryOptionalView:DropdownComponent;
  @ViewChild('receivingMail') private _dropdownReceivingMailView:DropdownComponent;


  /**
   * Element of DOM to check validation form
   * used to access of attribute who determine if field is valid
   * - {@link NgForm}
   * 
   * Composed of 3 parts
   */
  // Parts 1: Contact and phone form
  @ViewChild('mailAddress') private _mailAddress:NgForm;
  @ViewChild('ceilPhone') private _ceilPhone:NgForm;
  @ViewChild('businessPhone') private _businessPhone:NgForm;

  // Parts 2: Address form
  @ViewChild('citiesInput') private _city:NgForm;
  @ViewChild('additionalAddress') private _additionalAddress:NgForm;
  @ViewChild('addressNumber') private _addressNumber:NgForm;
  @ViewChild('addressName') private _addressName:NgForm;
  @ViewChild('locality') private _locality:NgForm;
  @ViewChild('zipCode') private _zipCode:NgForm;
  @ViewChild('numberPhone') private _numberPhone:NgForm;

  // Parts 3: Address optional form
  @ViewChild('citiesOptionalInput') private _cityOptional:NgForm;
  @ViewChild('additionalAddressOptional') private _additionalAddressOptional:NgForm;
  @ViewChild('addressNumberOptional') private _addressNumberOptional:NgForm;
  @ViewChild('addressNameOptional') private _addressNameOptional:NgForm;
  @ViewChild('zipCodeOptional') private _zipCodeOptional:NgForm;
  @ViewChild('localityOptional') private _localityOptional:NgForm;
  @ViewChild('numberPhoneOptional') private _numberPhoneOptional:NgForm;
  

  // Initializaion of component
  constructor(private _router:Router,
              private _addressService: AddressService, 
              private _cityService: CityService, 
              private _countryService: CountryService,
              private _contactInformationService: ContactInformationService,
              private _errorService: ErrorService,
              private _addressModuleService: AddressModuleService) {
  }


  // Initializaion on load page
  ngOnInit(): void {
    this._isValidForm = true;
    this.alertHidden = true;

    /**
     * Button for optional address
     * Default is hidden
     */
     this.isAddressOptionalHidden = true;
     this.nameButton = 'Ajouter';


     // Set default lenght zipcode and defaul country
     this.maxLengthOptionalZipcode = this._lengthFrenchZicope;
     this.isFrenchCountry = true;
     this.isFrenchCountryOptional = true;


    // Set default title of dropdown
    /*this._dropdownCityView.setDefaultTitle(this._defaulTitleCityDropdown);
    this._dropdownCountryView.setDefaultTitle(this._defaulTitleCountryDropdown);
    this._dropdownCityOptionalView.setDefaultTitle(this._defaulTitleCityDropdown);
    this._dropdownCountryOptionalView.setDefaultTitle(this._defaulTitleCountryDropdown);*/


    /**
     * Dropdown Address fix or every year
     * - {@link DropdownComponent} used to create Dropdown
     * - {@link DropdownValueModel} element to create DropdownComponent
     */
    this.dropdownAddress = Array();
    this.dropdownAddress.push(new DropdownValueModel(1, 'Adresse fixe'));
    this.dropdownAddress.push(new DropdownValueModel(2, 'Adresse à l\'année'));


    // Event toogle for Address Optional form
    this.toogleAction();

    this.phoneAndMailViewModel = new PhoneAndMailViewModel(null, null, null);
    this.addressViewModel = new AddressViewModel(null, null, null, null, null, null, null, null);
    this.addressOptionalViewModel = new AddressOptionalViewModel(null, null, null, null, null, null, null, null, null);

    if (this._addressService.getAddressViewModel()) {
      this.loadWithData();
    }
    else {
      setTimeout(() => {
        this.loadWithData();
      }, 100);
    }
  }

  /**
   * @method loadWithData
   * Called ONLY when the data is loaded
   */
  private loadWithData() {
    /**
     * Dropdown countries
     * - {@link CountryService} @Service to access of counties availables
     * - {@link _countryService getDropdownCountry()} @Method of CountryService
     *    Call an observable
     *    Return a {@link DropdownComponent}
     */
    this._countryService.getDropdownCountry()
      .subscribe(res => {
        this.dropdownCountry = res;
      },
      // else service send an error, we launch an alert
      error => {
        this._errorService.setError(this._titleErrorCountry);
        this.error.emit(this._titleErrorCountry);
        this.loadAlert(this._titleErrorCountry);
      });
      

    /**
     * Form contact and phone
     * - {@link ContactInformationService} @Service to access of user's contact and phone
     * - {@link ContactInformationService getContactInformationViewModel()} @method of ContactInformationService
     *    Return a {@link PhoneAndMailViewModel}
     */
    let phoneResult = this._contactInformationService.getContactInformationViewModel();
    if (phoneResult) {
      this.phoneAndMailViewModel = phoneResult;
    }


    /**
     * Form address
     * - {@link AddressService} @Service to access of user's address
     * - {@link AddressService getAddressViewModel()} @method of AddressService
     *    Return a {@link AddressViewModel}
     */
    this.addressViewModel = new AddressViewModel(null, null, null, null, null, null, null, null);
    let addressResult = this._addressService.getAddressViewModel();

    if (addressResult) {
      this.addressViewModel = addressResult;
     
      // Dropdown cities
      this.getDropdownCity();

      setTimeout(() => {
        this._dropdownCountryView.setTitle(this.addressViewModel.country || this._defaultCountryDropdown);

        // If the country is not French
        if (this.addressViewModel.country !== this._defaultCountryDropdown) {
          this.maxLengthZipcode = this._lengthOtherZicope;
          this.isFrenchCountry = false;
        }
      }, 200);


      // Get the boolean to show or hidden address optional
      this.isAddressOptionalHidden = !this._addressService.haveOptionalAddress();
      this.toogleAction();
    }
    else {
      setTimeout(() => {
        this._dropdownCountryView.setTitle(this._defaultCountryDropdown);
      }, 200);
    }


    /**
     * Form optional address
     * - {@link AddressService} @Service to access of user's optional address
     * - {@link AddressService getAddressOptionalViewModel()} @method of AddressService
     *    Return a {@link AddressOptionalViewModel}
     */
    this.addressOptionalViewModel = new AddressOptionalViewModel(null, null, null, null, null, null, null, null, 1);
    let addressOptionalResult = this._addressService.getAddressOptionalViewModel()
    if (addressOptionalResult) {
      this.addressOptionalViewModel = addressOptionalResult;

      // Dropdown cities optional
      this.getDropdownCityOptional();

       setTimeout(() => {
        this._dropdownCountryOptionalView.setTitle(this.addressOptionalViewModel.country || this._defaultCountryDropdown);
        this._dropdownReceivingMailView.setTitle(this.addressOptionalViewModel.receivingMail);

        // If the country is not French
        if (this.addressOptionalViewModel.country !== this._defaultCountryDropdown) {
          this.maxLengthOptionalZipcode = this._lengthOtherZicope;
          this.isFrenchCountryOptional = false;
        }
      }, 200);
    }
    else {
      setTimeout(() => {
        this._dropdownCountryOptionalView.setTitle(this._defaultCountryDropdown);
        this._dropdownReceivingMailView.setTitle(1);
      }, 200);
    }
  }


  /**
   * Dropdown cities
   * - {@link CityService} @Service to access of cities availables
   * - {@link CityService getDropdownCity()} @method of CityService
   *    Call an observable
   *    Return a {@link DropdownComponent}
   */
  private getDropdownCity() {
    this._cityService.getDropdownCity(this.addressViewModel.zipCode)
      .subscribe(res => {
        this.dropdownCity = res;
        
        // Set title of dropdown
        // setTimeout) is required to wait dropdown was not empty to choose the title
        setTimeout(() => {
          this._dropdownCityView.setTitle(this.addressViewModel.city);          
        }, 100);
      },

      // else service city send an error, we stock an error and redirect on previous
      error => {
        this._errorService.setError(this._titleErrorCity);
        this.error.emit(this._titleErrorCity);
        this.loadAlert(this._titleErrorCity);
      });  
  }   


  /**
   * Dropdown cities optional
   * - {@link CityService} @Service to access of cities availables
   * - {@link CityService getDropdownCity()} @method of CityService
   *    Call an observable
   *    Return a {@link DropdownComponent}
   */
  private getDropdownCityOptional() {
    this._cityService.getDropdownCity(this.addressOptionalViewModel.zipCode)
      .subscribe(res => {
        this.dropdownCityOptional = res;

        // Set title of dropdown
        // setTimeout is required to wait dropdown was not empty to choose the title
        setTimeout(() => {
          this._dropdownCityOptionalView.setTitle(this.addressOptionalViewModel.city);          
        }, 100);
      },

      // else service city send an error, we stock an error and redirect on previous
      error => {
        this._errorService.setError(this._titleErrorCity);
        this.error.emit(this._titleErrorCity);
        this.loadAlert(this._titleErrorCity);
      });
  }
  

  /**
   * @method onFocusZipcode
   * - {@link CityService} @Service city
   * 
   * Event on focus input zipcode of address form
   * Each 2 or 5 charater, @method getDropdownCity() of CityService is called
   * Dropdown cities of address form is updated 
   */
  onFocusZipcode() {
    if (this._defaultCountryDropdown === this._dropdownCountryView.getChoice().key &&
        (this.addressViewModel.zipCode.length === 2 || this.addressViewModel.zipCode.length === 5)) {
      this.getDropdownCity();
      this.addressViewModel.city = null;
      //this._dropdownCityView.setDefaultTitle(this._defaulTitleCityDropdown);
    }
  }


  /**
   * @method onFocusZipcodeOptional
   * - {@link CityService} @Service city
   * 
   * Event on focus input zipcode of address optional form
   * Each 2 or 5 charater, @method getDropdownCity() of CityService is called
   * Dropdown cities of address optional form is updated 
   */
  onFocusZipcodeOptional() {
    let keyChoice = this._dropdownCountryOptionalView.getChoice();
    if (keyChoice && this._defaultCountryDropdown === keyChoice.key &&
        (this.addressOptionalViewModel.zipCode.length === 2 || this.addressOptionalViewModel.zipCode.length === 5)) {
      this.getDropdownCityOptional();
      this.addressOptionalViewModel.city = null;
      //this._dropdownCityOptionalView.setDefaultTitle(this._defaulTitleCityDropdown);
    }
  }

  
  /**
   * @method checkNumberAddress
   * Check the number address is valid
   * 3 character max and digital charater only
   */
 checkNumberAddress() {
   this.addressNumberValid = false;
    if (this.addressViewModel.addressNumber && !isNaN(parseInt(this.addressViewModel.addressNumber.toString())) && this.addressViewModel.addressNumber <= 999) {
      this.addressNumberValid = true;
    }
    else if (!this.addressViewModel.addressNumber) {
      this.addressNumberValid = true;
    }
  }


  /**
   * @method checkNumberAddressOptional
   * Check the number address is valid
   * 3 character max and digital charater only
   */
 checkNumberAddressOptional() {
   this.addressNumberOptionalValid = false;
    if (this.addressOptionalViewModel.addressNumber && !isNaN(parseInt(this.addressOptionalViewModel.addressNumber.toString())) && this.addressOptionalViewModel.addressNumber <= 999) {
      this.addressNumberOptionalValid = true;
    }
    else if (!this.addressOptionalViewModel.addressNumber) {
      this.addressNumberOptionalValid = true;
    }
  }


  /**
   * @method chooseCountry
   * Check if country is French
   * If it's french : city field is a dropdown and zipcode is set at 5 character max
   * Else : city field is a input and zipcode is set at 10 character max
   */
 chooseCountry() {
    if (!this.isFrenchCountry && this._defaultCountryDropdown === this._dropdownCountryView.getChoice().key) {
      this.maxLengthZipcode = this._lengthFrenchZicope;
      this.isFrenchCountry = true;
      this.addressViewModel.city = null;
      //this._dropdownCityView.setDefaultTitle(this._defaulTitleCityDropdown);
    }
    else if (this.isFrenchCountry && this._defaultCountryDropdown !== this._dropdownCountryView.getChoice().key) {
      this.maxLengthZipcode = this._lengthOtherZicope;
      this.isFrenchCountry = false;
      this.addressViewModel.city = null;
    }
  }


  /**
   * @method chooseCountryOptional
   * Check if country is French
   * If it's french : city field is a dropdown and zipcode is set at 5 character max
   * Else : city field is a input and zipcode is set at 10 character max
   */
  chooseCountryOptional() {
    if (!this.isFrenchCountryOptional && this._defaultCountryDropdown === this._dropdownCountryOptionalView.getChoice().key) {
      this.maxLengthOptionalZipcode = this._lengthFrenchZicope;
      this.isFrenchCountryOptional = true;
      this.addressOptionalViewModel.city = null;
      //this._dropdownCityOptionalView.setDefaultTitle(this._defaulTitleCityDropdown);
    }
    else if (this.isFrenchCountryOptional && this._defaultCountryDropdown !== this._dropdownCountryOptionalView.getChoice().key) {
      this.maxLengthOptionalZipcode = this._lengthOtherZicope;
      this.isFrenchCountryOptional = false;
      this.addressOptionalViewModel.city = null;
    }
  }


  /**
   * @method dropdownCheck
   * Check dropdown is not empty
   * If not available, an error notifier is launch 
   */
  private dropdownCheck(dropdown: DropdownComponent, allowError?: boolean): any | null {
      let obj: DropdownValueModel = dropdown.getChoice();
      if (obj) {
        dropdown.setTitle(obj.key);
        return obj.key;
      }
      else if (allowError) {
        this._isValidForm = false;
      }
      return null;
  }


  /**
   * @method dropdownOnSubmit
   * Launch on submit
   * Check every dropdown is not empty
   * Set value of dropdown in address model
   */
  private dropdownOnSubmit() {
    // In Address Form
    if (this.isFrenchCountry) {
      this.addressViewModel.city = this.dropdownCheck(this._dropdownCityView, true) || this.addressViewModel.city;
    }
    else if (this._city.invalid) {
        this._isValidForm = false;
    }
    this.addressViewModel.country = this.dropdownCheck(this._dropdownCountryView, true) || this.addressViewModel.country;

    // In Address Optional Form
    if (!this.isAddressOptionalHidden) {
      if (this.isFrenchCountryOptional) {
        this.addressOptionalViewModel.city = this.dropdownCheck(this._dropdownCityOptionalView, true) || this.addressOptionalViewModel.city;
      }
      else if (this._cityOptional.invalid) {
          this._isValidForm = false;
      }
      this.addressOptionalViewModel.country = this.dropdownCheck(this._dropdownCountryOptionalView, true) || this.addressOptionalViewModel.country;  
      this.addressOptionalViewModel.receivingMail = this.dropdownCheck(this._dropdownReceivingMailView) || this.addressOptionalViewModel.receivingMail;
    }
  }



  /**
   * @method contactAndPhoneFormOnSubmit
   * Launch on submit
   * Check contact and phone form
   */
  private contactAndPhoneFormOnSubmit() {
    if (this._mailAddress.invalid || this._ceilPhone.invalid ||
        this._businessPhone.invalid) {
      this._isValidForm = false;
    }
  }


  /**
   * @method addressOnSubmit
   * Launch on submit
   * Check address form
   */
  private addressFormOnSubmit() {
    if (this._addressNumber.invalid || this._addressName.invalid ||
        this._zipCode.invalid || this._numberPhone.invalid ||
        this._additionalAddress.invalid || this._locality.invalid ||
        (this.addressViewModel.addressNumber ? this.addressViewModel.addressNumber.toString().length >= 4 : false)) {
      this._isValidForm = false;
    }
  }


  /**
   * @method addressOptionalFormOnSubmit
   * Launch on submit
   * Check address optional form
   */
  private addressOptionalFormOnSubmit() {
    if (this._addressNumberOptional.invalid || this._addressNameOptional.invalid ||
        this._zipCodeOptional.invalid || this._numberPhoneOptional.invalid ||
        this._additionalAddressOptional.invalid || this._localityOptional.invalid ||
        (this.addressOptionalViewModel.addressNumber ? this.addressOptionalViewModel.addressNumber.toString().length >= 4 : false)) {
      this._isValidForm = false;
    }
  }


  /**
   * @method submit
   * Check every field match with validation functional (required, email, tel, ...)
   * Set data in address model
   */
  private submit() {
    this._isValidForm = true;
    this.alertHidden = true;
    this.dropdownOnSubmit();
    this.contactAndPhoneFormOnSubmit();
    this.addressFormOnSubmit();

    // Only if address optional was add
    if (!this.isAddressOptionalHidden) {
      this.addressOptionalFormOnSubmit();
    }

    // If the form is valid
    if (this._isValidForm) {
      this.cleanAllNumberPhone();
      this._addressService.setAddress(this.addressViewModel, this.addressOptionalViewModel);
      this._contactInformationService.setContactInformation(this.phoneAndMailViewModel);
    }

    // If the form is invalid
    else {
      this.loadAlert(this._titleErrorForm);
    }
  }


  /**
   * @method loadAlert
   * Load alert component
   */
  private loadAlert(title: string, type?: string) {
    this.titleAlert = title;
    this.type = type || 'danger';
    this.alertHidden = false;
    this._isValidForm = false;
    this.alerts = this.alerts.map((alert: any) => Object.assign({}, alert));
  }


  /**
   * @method cleanNumberPhone
   * Convert all number phone to a right format
   */
  private cleanAllNumberPhone() {
    this.phoneAndMailViewModel.businessPhone = this.cleanNumberPhone(this.phoneAndMailViewModel.businessPhone);
    this.phoneAndMailViewModel.ceilPhone = this.cleanNumberPhone(this.phoneAndMailViewModel.ceilPhone);
    this.addressViewModel.numberPhone = this.cleanNumberPhone(this.addressViewModel.numberPhone);
    this.addressOptionalViewModel.numberPhone = this.cleanNumberPhone(this.addressOptionalViewModel.numberPhone);
  }


  /**
   * @method cleanNumberPhone
   * Delete every space and - or , in number phone
   */
  private cleanNumberPhone(numberPhone: string): string {
    if (numberPhone) {
      if (numberPhone.indexOf('+') !== -1) {
        numberPhone.substring(3);
        numberPhone = '0' + numberPhone;
      }
      numberPhone.replace(/-+/g, '');
      numberPhone.replace(/,+/g, '');
      return numberPhone.replace(/\s+/g, '');
    }
    return null;
  }


  /**
   * @method toogle
   * Set toogle for addressOptional
   */
  toogle() {
    this.isAddressOptionalHidden = !this.isAddressOptionalHidden;
    this.toogleAction();
    this._addressService.setHaveAddressOptional(!this.isAddressOptionalHidden);
    if (this.isAddressOptionalHidden) {
      this.deleteFormOptional();
    }
  }


  /**
   * @method deleteFormOptional
   * Delete all data in  addressOptional
   */
  private deleteFormOptional() {
    this.addressOptionalViewModel = new AddressOptionalViewModel(null, null, null, null, null, null, null, null, 1);
    //this._dropdownCityOptionalView.setDefaultTitle(this._defaulTitleCityDropdown);
    this._dropdownCountryOptionalView.setTitle(this._defaultCountryDropdown);
    this.maxLengthOptionalZipcode = this._lengthFrenchZicope;
    this.isFrenchCountryOptional = true;
    this._dropdownReceivingMailView.setTitle(1);
  }


  /**
   * @method toogleAction
   * Action toogle for addressOptional
   */
  private toogleAction() {
    if (this.isAddressOptionalHidden) {
      this.hiddenForm();
    }
    else {
      this.putForm();
    }
  }


  /**
   * @method putForm
   * Show address optional
   */
  private putForm() {
    this.nameButton = 'Supprimer';
  }


  /**
   * @method _hiddenForm
   * Hide address optional
   */
  private hiddenForm() {
    this.nameButton = 'Ajouter';
  }


  /**
   * @method backReinscritpion
   */
  backReinscritpion() {
    this._addressService.setAddress(this.addressViewModel, this.addressOptionalViewModel);
    this._contactInformationService.setContactInformation(this.phoneAndMailViewModel);
    this._errorService.next();
    this._router.navigate(['/etape-1']);
  }


  /**
   * @method submitReinscritpion
   */
  submitReinscritpion() {
    this.submit();
    if (this._isValidForm) {
      this._addressModuleService.submit()
        .subscribe(res => {
          this._router.navigate(['/etape-3']);
        },
        error => {
          // else service send an error, we launch an alert
          this.loadAlert(this._titleError404);
        });
    }
  }


  /**
   * @method submitAddress
   */
  submitAddress() {
    this.submit();
    if (this._isValidForm) {
     this._addressModuleService.submit()
        .subscribe(res => {
          this.loadAlert(this._titleSuccessForm, 'success');
          // If service send a success, we redirect
          //window.location.href = environment.backUri;
        },
        error => {
          // else service send an error, we launch an alert
          this.loadAlert(this._titleError404);
        });
    }
  }
}