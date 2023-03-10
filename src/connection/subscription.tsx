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
      transaction_hash
      transaction_is_closed
      updated_at
      doctor {
        _id
        created_at
        deleted_at
        doctor_address
        doctor_city
        doctor_date_of_birth
        doctor_email
        doctor_gender
        doctor_last_name
        doctor_name
        doctor_password
        doctor_phone
        doctor_state
        doctor_wallet_id
        doctor_zipcode
        updated_at
      }
      patient {
        _id
        created_at
        deleted_at
        patient_address
        patient_age
        patient_city
        patient_date_of_birth
        patient_email
        patient_gender
        patient_height
        patient_last_name
        patient_name
        patient_password
        patient_phone
        patient_state
        patient_wallet_id
        patient_weight
        patient_zipcode
        updated_at
        transaction_id {
          _id
          created_at
          deleted_at
          transaction_hash
          transaction_is_closed
          updated_at
          transaction_type {
            updated_at
            transaction_type_text
            deleted_at
            created_at
            _id
          }
        }
      }
    }
  }
`;
