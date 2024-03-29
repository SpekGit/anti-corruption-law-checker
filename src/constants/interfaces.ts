
export interface IAuth {
  username?: string;
  password?: string;
}
export interface IMeta {
  current_page: number;
  total: number;
  per_page: number
}
export interface Props {
  children: React.ReactNode;
}
export interface FilterProps {
  showFilter: boolean;
  setShowFilter: Function;
  setFilterData: Function;
  setPage: Function
}
export interface ReactSelectProps {
  name: string;
  edited?: boolean;
  control: any;
  required?: boolean | string;
  options: any[];
  clear?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  defaultValue?: any;
  title: string;
  error?: any;
  onInput?: Function;
  setSelectedValue?: Function
}
export interface DatePickerRangeProps {
  nameFrom: string;
  control: any;
  required?: boolean;
  nameTill: string;
  clear?: boolean;
  title: string
}
export interface DatePickerProps {
  name: string;
  control: any;
  required?: boolean | string;
  clear?: boolean;
  title: string;
  edited?: boolean;
  defaultValue?: string;
  error?: any
}

export interface PreloaderPops {
  playAnimation: boolean;
}

// Project interfaces
export interface LocalesName {
  kk: string;
  ru: string;
}
interface IUserRole {
  id: number;
  full_name: string
}
interface ProjectItem {
  id: number;
  locales: {
    name: LocalesName
  }
}
export interface IProject {
  note: any;
  branch_of_legislation: ProjectItem[];
  authority_developer: ProjectItem
  id: number;
  branch_of_legislations: ProjectItem[];
  conclusions: any[];
  coordinator: IUserRole
  corrector: IUserRole;
  created_at: string;
  date_of_receipt_of_the_draft_regulatory_legal_act: string
  document_type: {
    id: number;
    locales: {
      group: LocalesName,
      name: LocalesName
    }
  }
  incoming_letter_number: string
  locales: {
    archive: LocalesName,
    final_conclusion: LocalesName
    documents_submitted_for_scientific_anti_corruption_expertise: LocalesName,
    purpose_and_structure_of_the_draft_regulatory_legal_act: LocalesName,
    the_subject_and_goals_of_scientific_anti_corruption_expertise: LocalesName
    name: LocalesName
  }
  law_analysis: any;
  number_of_page: number
  outgoing_letter_number: string;
  outgoing_mail_date: string;
  published_at: string | null;
  re_examination: boolean;
  status: ProjectItem
  translator: IUserRole
}

