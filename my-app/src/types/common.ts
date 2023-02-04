export type FormType={
    name:string,
    label:string,
    type:string,
}


export type User={
    id:string,
    name:string,
    img?:string,
    email:string,
    role:string,

}
export interface SideBarItemProps {
    path: string;
    icon: React.ReactNode;
    label: string;
  }

  