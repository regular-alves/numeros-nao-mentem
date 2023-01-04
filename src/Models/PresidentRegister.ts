import Record from './Record';

class PresidentRegister extends Record {
    constructor(
        private _name: string,
        private _knownAs: string,
        private _slug: string,
        private _image: string,
        value: number | null = null,
        _start: Date | null = null,
        _end: Date | null = null,
    ) {
        super(value, _start, _end);

        this._name = _name;
        this._knownAs = _knownAs;
        this._slug = _slug;
        this._image = _image;
    }

    get name() {
        return this._name;
    }

    get knownAs() {
        return this._knownAs;
    }

    get slug() {
        return this._slug;
    }

    get image() {
        return this._image;
    }

}

export default PresidentRegister;