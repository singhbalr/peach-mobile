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
        doctor_name
        doctor_last_name
        doctor_wallet_id
        doctor_address
        doctor_city
        doctor_state
        doctor_zipcode
        doctor_phone
        doctor_email
        doctor_gender
        doctor_date_of_birth
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
        created_at
        updated_at
        deleted_at
      }
      transaction_hash
      transaction_is_closed
      transaction_type {
        _id
        created_at
        deleted_at
        transaction_type_text
        updated_at
      }
      updated_at
    }
  }
`;
