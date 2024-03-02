export type SourceProps = {
  name: string;
  url: string;
  seenAt?: string;
}

export class Source {
  public name: string;
  public url: string;
  public readonly seenAt?: Date;

  constructor(name: string, url: string, seenAt?: Date) {
      this.name = name;
      this.url = url;
      this.seenAt = seenAt;
  }

  static get(props: SourceProps) {
      return this.constructor(
          props.name,
          props.url,
          props?.seenAt && new Date(props.seenAt)
      );
  }
}