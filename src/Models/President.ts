import Record from "./Record";

export default class President extends Record {
    constructor(
        private _name: string | null = null,
        private _knownAs: string | null = null,
        private _slug: string | null = null,
        private _image: string | null = null,
        start: Date | null = null,
        end: Date | null = null
    ) {
        super(null, start, end);
    }

    get name(): string | null {
        return this._name;
    }

    get knownAs(): string | null {
        return this._knownAs;
    }

    get slug(): string | null {
        return this._slug;
    }

    get image(): string | null {
        return this._image;
    }
}