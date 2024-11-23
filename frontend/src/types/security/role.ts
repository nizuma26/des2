export interface Permission {
    id: number;
    name: string;
    codename?: string;
  }
  
  export interface Module {
    id: number;
    module: string;
    permissions: [Permission];
  }
  
  export interface Role {
    id?: number,
    name: string;
    permissions: number[]
  }