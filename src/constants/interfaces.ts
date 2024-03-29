
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


export interface IInput {    //InputComponent
  register: Function;
  type?: string;
  fileNotice?: string;
  required: boolean;
  edited: boolean;
  title: string;
  name: string;
  error: any;
  defaultValue?: string | number | null;
  max?: number;
  accept?: string;
  multiple?: boolean;
  submited?: boolean;
  onInput?: Function;
  mask?: string
}
export interface IChangeProject { //Change project interface
  projectData: IProject;
  editProject: boolean
}
/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
export interface IFormData {
  append(name: string, value: string | Blob, fileName?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, fileName?: string): void;
  forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}
export interface INewProject {
  re_examination: string;
  note: string;
  status_id: number;
  document_type_id: string;
  name_kk: string;
  name_ru: string;
  published: string;
  date_of_receipt_of_the_draft_regulatory_legal_act: string;
  purpose_and_structure_of_the_draft_regulatory_legal_act_kk: string;
  purpose_and_structure_of_the_draft_regulatory_legal_act_ru: string;
  documents_submitted_for_scientific_anti_corruption_expertise_kk: string;
  documents_submitted_for_scientific_anti_corruption_expertise_ru: string;
  the_subject_and_goals_of_scientific_anti_corruption_expertise_kk: string;
  the_subject_and_goals_of_scientific_anti_corruption_expertise_ru: string;
  incoming_letter_number: string;
  outgoing_letter_number: string;
  outgoing_mail_date: string;
  number_of_pages: string;
  branch_of_legislations: number[];
  uploads_kk: any;
  uploads_ru: any;
  uploads_ai: any
}

export interface IProjectsPublushed {
  [x: string]: any;
  id: number;
  authority_developer: ProjectItem;
  branch_of_legislations: ProjectItem[];
  locales: {
    name: LocalesName;
    final_conclusion: LocalesName
  };
  published_at: string | null;
  cover_letter: string | null
}

export interface ICatalogItem {
  id: number;
  base_cost?: number | null;
  remark_cost?: number | null;
  locales: {
    coordinator_cost?: number | null;
    group: LocalesName;
    name: LocalesName;
  }
}
export interface ICatalogs {
  data: ICatalogItem[]
  meta: IMeta
}

export interface IConclusion {
  deadline: string;
  id: number | null;
  project_id: number | null;
  expert_full_name: string;
  status: {
    id: number
    locales: {
      name: LocalesName
    }
  }
}