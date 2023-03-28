export interface Hosts {
    ip: string;
    id: number;
    port: number;
    session: string;
  }
  

export interface DestroyControlUsers {
    where: {
      users: {
        id: number
      }
    }
  }
  
  export interface ApiHosts {
    url: string;
    session: string;
  }