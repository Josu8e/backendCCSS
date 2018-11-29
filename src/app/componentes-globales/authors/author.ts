export class Author {
  private _fullname: string;
  private _career: string;

  get fullname(): string {
    return this._fullname;
  }

  set fullname(value: string) {
    this._fullname = value;
  }

  get career(): string {
    return this._career;
  }

  set career(value: string) {
    this._career = value;
  }

  constructor(fullname: string, career: string) {
    this._fullname = fullname;
    this._career = career;
  }
}
