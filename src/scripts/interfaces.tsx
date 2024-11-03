export interface MadLib {
  blanks: string[];
  text: string[];
  title: string;
  image: string;
}

export interface MadLibRaw {
  blanks: string[];
  text: string[];
  image: string;
}

export interface MadLibJSON {
  [key: string]: MadLibRaw;
}
