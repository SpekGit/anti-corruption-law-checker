import * as yup from "yup";

// email: string;
// phoneNumber: string;
export const Auth = yup.object().shape({
  username: yup.string().required("error_input"),
  password: yup
    .string()
    .required("error_input")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export const EditProject = yup.object().shape({
  incoming_letter_number: yup.string().required("error_input"),
  outgoing_letter_number: yup.string().required("error_input"),
  outgoing_mail_date: yup.string()
    .test({
      test: (value) => {
        if (value == "Invalid date") {
          return false;
        } else {
          return true;
        }
      },
      message: "Некорректный формат даты",
    }).required("error_input"),
  date_of_receipt_of_the_draft_regulatory_legal_act: yup.string()
    .test({
      test: (value) => {
        if (value == "Invalid date") {
          return false;
        } else {
          return true;
        }
      },
      message: "Некорректный формат даты",
    }).required("error_input"),
  branch_of_legislations: yup.array()
    .test({
      test: (value) => {
        if (value?.length == 0) {
          return false;
        } else {
          return true;
        }
      },
      message: "error_input",
    })
});

export const AddProject = yup.object().shape({
  re_examination: yup.string().required("error_input"),
  note: yup.string().required("error_input"),
  document_type_id: yup.string().required("error_input"),
  name_kk: yup.string().required("error_input"),
  published: yup.string().required("error_input"),
  name_ru: yup.string().required("error_input"),
  authority_developer_id: yup.string().required("error_input"),
  incoming_letter_number: yup.string().required("error_input"),
  outgoing_letter_number: yup.string().required("error_input"),
  outgoing_mail_date: yup.string()
    .test({
      test: (value) => {
        if (value == "Invalid date") {
          return false;
        } else {
          return true;
        }
      },
      message: "Некорректный формат даты",
    }).required("error_input"),
  date_of_receipt_of_the_draft_regulatory_legal_act: yup.string()
    .test({
      test: (value) => {
        if (value == "Invalid date") {
          return false;
        } else {
          return true;
        }
      },
      message: "Некорректный формат даты",
    }).required("error_input"),
  branch_of_legislations: yup.array()
    .test({
      test: (value) => {
        if (value?.length == 0) {
          return false;
        } else {
          return true;
        }
      },
      message: "error_input",
    }).required("error_input"),
  purpose_and_structure_of_the_draft_regulatory_legal_act_kk: yup.string().required("error_input"),
  purpose_and_structure_of_the_draft_regulatory_legal_act_ru: yup.string().required("error_input"),
  documents_submitted_for_scientific_anti_corruption_expertise_kk: yup.string().required("error_input"),
  documents_submitted_for_scientific_anti_corruption_expertise_ru: yup.string().required("error_input"),
  the_subject_and_goals_of_scientific_anti_corruption_expertise_kk: yup.string().required("error_input"),
  the_subject_and_goals_of_scientific_anti_corruption_expertise_ru: yup.string().required("error_input"),
  number_of_pages: yup.string().required("error_input"),
  uploads_kk: yup.mixed().required("error_input_file").test("error_input!", "error_input_file", value => value[0]),
  uploads_ru: yup.mixed().required("error_input_file").test("error_input!", "error_input_file", value => value[0]),
  uploads_ai: yup.mixed().required("error_input_file").test("error_input!", "error_input_file", value => value[0]),
  email: yup.string().email("error_input_email").required("error_input"),
});
export const CatalogItem = yup.object().shape({
  name_kk: yup.string().nullable().required("error_input"),
  name_ru: yup.string().nullable().required("error_input"),
  group_kk: yup.string().nullable(),
  group_ru: yup.string().nullable(),
  base_cost: yup.string().nullable(),
  remark_cost: yup.string().nullable(),
});
export const AssignByEDS = yup.object().shape({
  password: yup.string().required("error_input")
    .matches(/^([A-Za-z0-9.-\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Пароль должен содержать только латинские буквы'),
  file3: yup.mixed().required("error_input_file").test("error_input!", "error_input_file", value => value[0]),
});

export const AddUser = yup.object().shape({
  role: yup.string().required("error_input"),
  birth_date: yup.string().when('role', { is: (role: string) => role === 'expert' || role === 'coordinator', then: yup.string().required('error_input') }),
  full_name: yup.string().required("error_input"),
  email: yup.string().email("error_input_email").required("error_input"),
  tin: yup.string().required("error_input").test({
    test: (value) => {
      if (!value) {
        return false;
      } else if (value.replace(/_/g, "").length !== 12) {
        return false;
      }
      return true;
    },
    message: "ИИН должен содержать 12 символов",
  }),
  password: yup.string().required("error_input")
    .matches(/^([A-Za-z0-9.-\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Пароль должен содержать только латинские буквы'),
  scientific_title_kk: yup.string().when('role', { is: 'expert', then: yup.string().required('error_input'), }),
  scientific_title_ru: yup.string().when('role', { is: 'expert', then: yup.string().required('error_input') }),
  organization_kk: yup.string().when('role', { is: (role: string) => role === 'expert' || role === 'coordinator', then: yup.string().required('error_input') }),
  organization_ru: yup.string().when('role', { is: (role: string) => role === 'expert' || role === 'coordinator', then: yup.string().required('error_input') }),
  academic_degree_kk: yup.string().when('role', { is: 'expert', then: yup.string().required('error_input') }),
  academic_degree_ru: yup.string().when('role', { is: 'expert', then: yup.string().required('error_input') }),
  branch_of_legislations: yup.array().when('role', {
    is: 'expert', then: yup.array().test({
      test: (value) => {
        if (value?.length == 0) {
          return false;
        } else {
          return true;
        }
      },
      message: "error_input",
    }).required('error_input')
  }),
  job_title_ru: yup.string().when('role', { is: (role: string) => role === 'expert' || role === 'coordinator', then: yup.string().required('error_input') }),
  job_title_kk: yup.string().when('role', { is: (role: string) => role === 'expert' || role === 'coordinator', then: yup.string().required('error_input') }),
  phone: yup.string().when('role', {
    is: (role: string) => role === 'expert' || role === 'coordinator', then: yup.string().test({
      test: (value) => {
        if (!value) {
          return false;
        } else if (value.replace(/_/g, "").length !== 18) {
          return false;
        }
        return true;
      },
      message: "Некорректный формат номера",
    }).required('error_input')
  }),
})




