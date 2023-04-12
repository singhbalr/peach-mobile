import React from "react";
import { View, Text } from "react-native";
import { gql } from "@apollo/client";

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
          doctor_id {
            doctor_name
            doctor_last_name
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
        contribute_data_count
        patient_reward_count
        opportunities_count
        opportunities_count_filtered
      }
    }
  }
`;

export const GET_REWARDS_BY_PATIENT_ID = gql`
  mutation GetPatientReward($reward: PatientRewardPatientId!) {
    getPatientReward(reward: $reward) {
      _id
      created_at
      deleted_at
      is_redeemed
      updated_at
      opportunity {
        _id
        created_at
        deleted_at
        opportunity_data_accesibility_duration
        opportunity_description
        opportunity_is_closed
        opportunity_expiration
        opportunity_medical_record_accesibility_duration
        opportunity_name
        opportunity_picture_banner
        opportunity_purpose
        opportunity_quota_count
        opportunity_type_id {
          updated_at
          opportunity_type
          opportunity_type_text
          deleted_at
          _id
          created_at
        }
        opportunity_withdraw_data_rules
        organization_id
        updated_at
        reward {
          _id
          created_at
          deleted_at
          opportunity_id
          reward_name
          reward_amount
          reward_type
          updated_at
          reward_type_description {
            _id
            created_at
            deleted_at
            reward_type
            reward_type_text
            updated_at
          }
        }
      }
      organization {
        _id
        organization_name
        organization_wallet_id
        organization_age
        organization_address
        organization_city
        organization_state
        organization_zipcode
        organization_phone
        organization_email
        organization_password
        created_at
        updated_at
        deleted_at
      }
    }
  }
`;

export const GET_SHARED_DATA = gql`
  mutation GetSharedDataByPatient($input: PatientID!) {
    getSharedDataByPatient(input: $input) {
      _id
      created_at
      deleted_at
      opportunity {
        _id
        created_at
        deleted_at
        opportunity_data_accesibility_duration
        opportunity_description
        opportunity_expiration
        opportunity_is_closed
        opportunity_medical_record_accesibility_duration
        opportunity_name
        opportunity_picture_banner
        opportunity_purpose
        opportunity_quota_count
        opportunity_withdraw_data_rules
        organization_id
        updated_at
        organization {
          _id
          organization_name
          organization_wallet_id
          organization_age
          organization_address
          organization_city
          organization_state
          organization_zipcode
          organization_phone
          organization_email
          organization_password
          created_at
          updated_at
          deleted_at
        }
        opportunity_type_id {
          _id
          opportunity_type
          opportunity_type_text
          created_at
          updated_at
          deleted_at
        }
      }
      organization_id
      transaction_hash
      transaction_is_closed
      updated_at
      transaction_type {
        _id
        transaction_type_text
        created_at
        updated_at
        deleted_at
      }
    }
  }
`;

export const CREATE_TRANSACTION_ORGANIZATION = gql`
  mutation CreateTransactionOrganization($input: TransactionInput!) {
    createTransactionOrganization(input: $input) {
      _id
      created_at
      deleted_at
      organization_id
      updated_at
      transaction_hash
    }
  }
`;
export const REDEEM_REWARD = gql`
  mutation RedeemPatientReward($reward: PatientRewardInput!) {
    redeemPatientReward(reward: $reward) {
      _id
      created_at
      deleted_at
      is_redeemed
      updated_at
    }
  }
`;

export const GET_MEDICAL_RECORD_BY_BODY_PART = gql`
  mutation GetMedicalRecordFileByBodyTypeAndPatientId(
    $record: SearchBodyType!
  ) {
    getMedicalRecordFileByBodyTypeAndPatientId(record: $record) {
      _id
      medical_record_file_description
      medical_record_file_link
      medical_record_file_link_text
      medical_record_file_name
      medical_record_file_type
      medical_record_file_type_id {
        updated_at
        file_type_text
        file_type
        deleted_at
        created_at
        _id
      }
      updated_at
      medical_record {
        updated_at
        deleted_at
        created_at
        _id
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
      }
    }
  }
`;

export const GET_FOLLOW_UP_REQUEST_BY_PATIENT_ID = gql`
  mutation GetFollowUpRequestByPatientId($input: PatientID!) {
    getFollowUpRequestByPatientId(input: $input) {
      _id
      created_at
      deleted_at
      updated_at
      transaction_type {
        updated_at
        transaction_type_text
        deleted_at
        created_at
        _id
      }
      transaction_is_closed
      transaction_hash
      related_opportunity_id
      opportunity {
        _id
        created_at
        deleted_at
        applied_patient {
          _id
        }
        opportunity_data_accesibility_duration
        opportunity_description
        opportunity_expiration
        opportunity_is_closed
        opportunity_medical_record_accesibility_duration
        opportunity_name
        opportunity_picture_banner
        opportunity_purpose
        opportunity_quota_count
        opportunity_type_id {
          _id
          created_at
          deleted_at
          opportunity_type
          opportunity_type_text
          updated_at
        }
        opportunity_withdraw_data_rules
        organization_id
        organization {
          _id
          created_at
          deleted_at
          organization_address
          organization_age
          organization_city
          organization_email
          organization_name
          organization_password
          organization_phone
          organization_wallet_id
          organization_state
          organization_zipcode
          updated_at
        }
        updated_at
        reward {
          _id
          created_at
          deleted_at
          opportunity_id
          reward_amount
          reward_name
          reward_type
          updated_at
          reward_type_description {
            _id
            created_at
            deleted_at
            reward_type
            reward_type_text
            updated_at
          }
        }
        related_opportunity {
          opportunity_picture_banner
          opportunity_purpose
          opportunity_name
          opportunity_medical_record_accesibility_duration
          opportunity_is_closed
          opportunity_expiration
          opportunity_description
          opportunity_type_id {
            _id
            created_at
            deleted_at
            opportunity_type
            opportunity_type_text
            updated_at
          }
        }
      }
    }
  }
`;

export const GET_MEDICAL_HEALTH_INFO = gql`
  mutation GetMedicalHealthInfo($input: PatientID!) {
    getMedicalHealthInfo(input: $input) {
      _id
      deleted_at
      created_at
      organization {
        _id
        created_at
        deleted_at
        organization_address
        organization_age
        organization_city
        organization_email
        organization_name
        organization_password
        organization_phone
        organization_state
        organization_zipcode
        updated_at
        organization_wallet_id
      }
      opportunity {
        _id
        created_at
        deleted_at
        organization {
          _id
          created_at
          deleted_at
          organization_address
          organization_age
          organization_city
          organization_email
          organization_name
          organization_password
          organization_phone
          organization_state
          organization_zipcode
          updated_at
          organization_wallet_id
        }
        medical_health_info {
          _id
          advertisement_click
          advertisement_content
          advertisement_image
          advertisement_title
          advertisement_views
          created_at
          deleted_at
          updated_at
        }
        opportunity_description
        opportunity_expiration
        opportunity_name
        opportunity_picture_banner
        opportunity_purpose
        opportunity_quota_count
        opportunity_withdraw_data_rules
      }
    }
  }
`;
export const GET_SHARED_DATA_BY_PATIENT = gql`
  mutation GetSharedDataByPatientDoctor($input: PatientID!) {
    getSharedDataByPatientDoctor(input: $input) {
      _id
      created_at
      deleted_at
      opportunity {
        _id
        created_at
        deleted_at
        opportunity_data_accesibility_duration
        opportunity_description
        opportunity_expiration
        opportunity_is_closed
        opportunity_medical_record_accesibility_duration
        opportunity_name
        opportunity_picture_banner
        opportunity_purpose
        opportunity_quota_count
        opportunity_withdraw_data_rules
        organization_id
        updated_at
        organization {
          _id
          organization_name
          organization_wallet_id
          organization_age
          organization_address
          organization_city
          organization_state
          organization_zipcode
          organization_phone
          organization_email
          organization_password
          created_at
          updated_at
          deleted_at
        }
        opportunity_type_id {
          _id
          opportunity_type
          opportunity_type_text
          created_at
          updated_at
          deleted_at
        }
      }
      organization_id
      transaction_hash
      transaction_is_closed
      updated_at
      transaction_type {
        _id
        transaction_type_text
        created_at
        updated_at
        deleted_at
      }
      doctor {
        doctor_email
        doctor_last_name
        doctor_gender
        doctor_name
        doctor_phone
        doctor_state
        doctor_wallet_id
        hospital_id {
          _id
          hospital_address
          hospital_city
          hospital_email
          hospital_logo
          hospital_name
          hospital_phone
          hospital_state
        }
      }
    }
  }
`;

export const APPROVE_DOCTOR_REQUEST = gql`
  mutation UpdateTransaction(
    $updateTransactionId: ID!
    $input: UpdateTransactionInput
  ) {
    updateTransaction(id: $updateTransactionId, input: $input) {
      _id
      created_at
      deleted_at
    }
  }
`;

export const GET_OPPORTUNITY_BY_ORGANIZATION_ID = gql`
  mutation GetOpportunityByOrganizationIdMobile(
    $getOpportunityByOrganizationIdMobileId: ID!
  ) {
    getOpportunityByOrganizationIdMobile(
      id: $getOpportunityByOrganizationIdMobileId
    ) {
      _id
      applied_patient {
        patient {
          _id
        }
      }
      organization {
        _id
        organization_name
        organization_wallet_id
        organization_age
        organization_address
        organization_city
        organization_state
        organization_zipcode
        organization_phone
        organization_email
        organization_password
        created_at
        updated_at
        deleted_at
      }
      reward {
        _id
        created_at
        deleted_at
        opportunity_id
        reward_amount
        reward_name
        reward_type
        updated_at
        reward_type_description {
          _id
          created_at
          deleted_at
          reward_type
          reward_type_text
          updated_at
        }
      }
      opportunity_type_id {
        _id
        opportunity_type
        opportunity_type_text
        created_at
        updated_at
        deleted_at
      }

      opportunity_picture_banner
      opportunity_name
      opportunity_description
      opportunity_expiration
      opportunity_purpose
      opportunity_medical_record_accesibility_duration
      opportunity_data_accesibility_duration
      opportunity_is_closed
      opportunity_quota_count
      opportunity_withdraw_data_rules
      created_at
      updated_at
      deleted_at
      medical_health_info {
        _id
        advertisement_click
        advertisement_content
        advertisement_image
        advertisement_title
        advertisement_views
        created_at
        deleted_at
        updated_at
      }
    }
  }
`;

export const GET_OPPORTUNITY_BY_ORGANIZATION_ID_FILTERED = gql`
  mutation GetOpportunityByOrganizationIdOpp(
    $getOpportunityByOrganizationIdOppId: ID!
  ) {
    getOpportunityByOrganizationIdOpp(
      id: $getOpportunityByOrganizationIdOppId
    ) {
      _id
      applied_patient {
        patient {
          _id
        }
      }
      organization {
        _id
        organization_name
        organization_wallet_id
        organization_age
        organization_address
        organization_city
        organization_state
        organization_zipcode
        organization_phone
        organization_email
        organization_password
        created_at
        updated_at
        deleted_at
      }
      reward {
        _id
        created_at
        deleted_at
        opportunity_id
        reward_amount
        reward_name
        reward_type
        updated_at
        reward_type_description {
          _id
          created_at
          deleted_at
          reward_type
          reward_type_text
          updated_at
        }
      }
      opportunity_type_id {
        _id
        opportunity_type
        opportunity_type_text
        created_at
        updated_at
        deleted_at
      }

      opportunity_picture_banner
      opportunity_name
      opportunity_description
      opportunity_expiration
      opportunity_purpose
      opportunity_medical_record_accesibility_duration
      opportunity_data_accesibility_duration
      opportunity_is_closed
      opportunity_quota_count
      opportunity_withdraw_data_rules
      created_at
      updated_at
      deleted_at
      medical_health_info {
        _id
        advertisement_click
        advertisement_content
        advertisement_image
        advertisement_title
        advertisement_views
        created_at
        deleted_at
        updated_at
      }
    }
  }
`;
