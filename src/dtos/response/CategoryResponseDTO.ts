export interface Type {
  id: number;
  name: string;
  category_id: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  types: Type[];
}
