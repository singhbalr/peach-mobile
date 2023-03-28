import React from "react";
import { View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";

export const GET_DOCTOR_REQUEST = gql`
  mutation GetTransactionByPatientId($input: PatientID!) {
    getTransactionByPatientId(input: $input) {
      _id
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
      created_at
      deleted_at
      medical_record {
        _id
        body_part
        medical_record_file {
          _id
          medical_record_id
          medical_record_file_type
          medical_record_file_name
          medical_record_file_link
          medical_record_file_link_text
          medical_record_file_description
          created_at
          updated_at
          deleted_at
        }
        created_at
        updated_at
        deleted_at
      }
      patient {
        _id
        patient_name
        patient_last_name
        patient_wallet_id
        patient_age
        patient_address
        patient_city
        patient_state
        patient_zipcode
        patient_phone
        patient_email
        patient_gender
        patient_date_of_birth
        patient_height
        patient_weight
        created_at
        updated_at
        deleted_at
      }
      transaction_hash
      transaction_is_closed
      transaction_type {
        _id
        transaction_type_text
        created_at
        updated_at
        deleted_at
      }
      updated_at
    }
  }
`;

export const UPDATE_TRANSACTION_BY_TRANSACTION_TYPE_ID = gql`
  mutation UpdateTransaction(
    $updateTransactionId: ID!
    $input: UpdateTransactionInput
  ) {
    updateTransaction(id: $updateTransactionId, input: $input) {
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
        patient_phone
        updated_at
        patient_zipcode
        patient_weight
        patient_wallet_id
        patient_state
      }
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
`;

export const PATIENT_LOGIN = gql`
  mutation PatientLogin($input: PatientCredential) {
    patientLogin(input: $input) {
      token
      data {
        _id
        created_at
        deleted_at
        medical_record {
          _id
          created_at
          deleted_at
          is_patient_accessible
          updated_at
          medical_record_file {
            _id
            created_at
            deleted_at
            file_metadata {
              _id
              body_part
              page
              medical_record_file_id
              created_at
              updated_at
              deleted_at
            }
            medical_record_file_description
            medical_record_file_link
            medical_record_file_link_text
            medical_record_file_name
            medical_record_file_type
            medical_record_id
            updated_at
            medical_record_file_type_id {
              _id
              file_type
              file_type_text
              created_at
              updated_at
              deleted_at
            }
          }
        }
        patient_address
        patient_age
        patient_city
        patient_date_of_birth
        patient_email
        patient_gender
        patient_height
        patient_identification_number
        patient_last_name
        patient_name
        patient_password
        patient_phone
        patient_state
        patient_wallet_id
        patient_weight
        patient_zipcode
        updated_at
      }
    }
  }
`;
