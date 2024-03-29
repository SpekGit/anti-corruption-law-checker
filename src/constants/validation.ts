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