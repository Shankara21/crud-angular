export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  description: string;
  year: string;
  status: string;
  Category: Category;
}

export interface Category {
  name: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toHistory(json: string): History {
    return JSON.parse(json);
  }

  public static historyToJson(value: History): string {
    return JSON.stringify(value);
  }
}
