/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

/**
 * @enum StatusEnum
 * used to know the status of object
 */
export enum StatusEnum {
    NOT_MODIFIED = 1 ,
    DELETED = 2,
    MODIFIED = 3,
    NEW = 4
}

/**
 * @service StatusEnumHelper
 *
 * @stable
 */
interface IStatusEnumHelper {
    /**
     * @interface IStatusEnumHelper
     *
     * 
     */
}
export class StatusEnumHelper implements IStatusEnumHelper {

    /**
     * @method checkModified
     */
    static checkModified(oldValue: any, newValue: any): string {
        if (oldValue) {
            if (newValue) {
                 if (!this.equals(oldValue, newValue)) {
                    return "MODIFIED";
                }
                else {
                    return "NOT_MODIFIED"; 
                }
            }
            else {
                return "DELETED"; 
            }
        }
        else {
            if (newValue) {
                return "NEW"; 
            }
           return "NOT_MODIFIED"; 
        }
    }

    /**
     * @method equals
     * check if any type or object is equal
     */
    private static equals(x, y) {
        if (x === y)
            return true;
        // if both x and y are null or undefined and exactly the same
        if (!(x instanceof Object) || !(y instanceof Object))
            return false;
        // if they are not strictly equal, they both need to be Objects
        if (x.constructor !== y.constructor)
            return false;
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

        let p;
        for (p in x) {
            if (!x.hasOwnProperty(p))
                continue;
            // other properties were tested using x.constructor === y.constructor
            if (!y.hasOwnProperty(p))
                return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined
            if (x[p] === y[p])
                continue;
            // if they have the same strict value or identity then they are equal
            if (typeof (x[p]) !== "object")
                return false;
        }
        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
        }
        return true;
    }
}
