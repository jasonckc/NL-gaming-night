import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Serializer {

    static save = (name, value) => {
        cookies.set(name, value);
    }

    static load = (name, defaultValue, cb = null) => {
        let value = cookies.get(name);
        if (!value) {
            return defaultValue;
        }
        return cb === null ? value : cb(value);
    }

    static unset = (name) => {
        cookies.remove(name);
    }
}

export default Serializer;