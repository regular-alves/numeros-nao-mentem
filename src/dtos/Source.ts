export type SourceProps = {
  name: string;
  url: string;
  seenAt?: string;
}

export default class Source {
  public readonly seenAt?: Date;

  constructor(public name: string, public url: string, seenAt: Date | null | undefined) {
    if (seenAt) {
      this.seenAt = seenAt;
    }
  }

  static get(data: SourceProps): Source {
      let seenAt = null;

      if (data?.seenAt) {
        seenAt = new Date(data.seenAt);
      }

      return new Source(data.name, data.url, seenAt);
  }
}