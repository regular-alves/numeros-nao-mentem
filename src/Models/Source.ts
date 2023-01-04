import ISource from '../Interfaces/ISource';

export default class Source implements ISource {
  private _name: string;

  private _url: string;

  private _viewedAt: Date | null = null;

  constructor(name: string, url: string, viewedAt?: Date) {
    this._name = name;
    this._url = url;

    if (viewedAt) {
      this._viewedAt = viewedAt;
    }
  }

  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }

  get viewed_at(): Date | null {
    return this._viewedAt;
  }

  static from(data: ISource): Source {
    let viewedAt = null;

    if (data?.viewed_at) {
      viewedAt = new Date(data.viewed_at);
    }

    return new Source(data.name, data.url, viewedAt);
  }
}
