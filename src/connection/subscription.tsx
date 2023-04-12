import { gql } from "@apollo/client";

export const TRANSACTION_UPDATED_SUBSCRIPTION = gql`
  subscription Subscription {
    transactionUpdated {
      _id
      created_at
      deleted_at
      doctor {
        _id
        created_at
        deleted_at
        doctor_address
        doctor_city
        doctor_date_of_birth
        doctor_email
        doctor_last_name
        doctor_gender
        doctor_name
        doctor_state
        doctor_phone
        doctor_wallet_id
        doctor_zipcode
        updated_at
        hospital_id {
          _id
          hospital_name
          hospital_address
          hospital_city
          hospital_state
          hospital_zipcode
          hospital_phone
          hospital_email
          hospital_website
          created_at
          updated_at
          deleted_at
        }
      }
      transaction_hash
      transaction_is_closed
      updated_at
    }
  }
`;

export const NEW_TRANSACTION = gql`
  subscription NewTransaction {
    newTransaction {
      _id
      created_at
      deleted_at
      doctor {
        _id
        created_at
        deleted_at
        doctor_address
        doctor_city
        doctor_email
        doctor_date_of_birth
        doctor_gender
        doctor_last_name
        doctor_name
        doctor_password
        doctor_phone
        doctor_zipcode
        doctor_wallet_id
        doctor_state
        hospital_id {
          _id
          created_at
          deleted_at
          hospital_address
          hospital_city
          hospital_email
          hospital_logo
          hospital_name
          hospital_phone
          hospital_state
          hospital_website
          hospital_zipcode
          updated_at
        }
        updated_at
      }
      transaction_type {
        _id
        created_at
        deleted_at
        transaction_type_text
        updated_at
      }
      updated_at
      patient {
        _id
        patient_email
        patient_date_of_birth
        patient_age
        patient_city
        patient_address
        patient_gender
        patient_height
        patient_identification_number
        patient_last_name
        patient_name
      }
    }
  }
`;

export const NEW_MEDICAL_HEALTH_INFO = gql`
  subscription NewTransaction {
    newAdvertisement {
      _id
      opportunity_id {
        _id
        applied_patient {
          _id
          patient {
            _id
          }
        }
      }
    }
  }
`;
export const NEW_FOLLOWUP_REQUEST = gql`
  subscription Subscription {
    newFollowupRequest {
      _id
      created_at
      deleted_at
      patient {
        _id
      }
    }
  }
`;
