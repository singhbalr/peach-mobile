import { gql } from "@apollo/client";

export const GET_ALL_OPPORTUNITY = gql`
  query Opportunities {
    opportunities {
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
    }
  }
`;
