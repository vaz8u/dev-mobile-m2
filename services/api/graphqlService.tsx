import { useMutation, useQuery, gql } from '@apollo/client';

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput) {
      _id
      username
    }
  }
`;

const CREATE_ALARM = gql`
  mutation CreateAlarm($alarmInput: CreateAlarmInput!) {
    createAlarm(alarmInput: $alarmInput) {
      _id
      name
      triggeredDate
      alarmSound
      vibratorSound
    }
  }
`;

const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      _id
      username
    }
  }
`;

export const GET_ALARMS = gql`
  query GetAlarms {
    alarms {
      _id
      name
      triggeredDate
      alarmSound
      vibratorSound
      activated
    }
  }
`;

const GET_ALARM = gql`
  query GetAlarm($alarmId: String!) {
    alarm(id: $alarmId) {
      _id
      name
      triggeredDate
      alarmSound
      vibratorSound
      activated
    }
  }
`;

const UPDATE_ALARM = gql`
  mutation UpdateAlarm($updateAlarmInput: UpdateAlarmInput!) {
    updateAlarm(updateAlarmInput: $updateAlarmInput) {
      _id
      name
      triggeredDate
      alarmSound
      vibratorSound
    }
  }
`;

const DELETE_ALARM = gql`
  mutation DeleteAlarm($alarmId: String!) {
    deleteAlarm(alarmId: $alarmId)
  }
`;

const ACTIVATE_ALARM = gql`
  mutation ActivateAlarm($id: String!) {
    activateAlarm(id: $id) {
      _id
      name
      triggeredDate
      alarmSound
      vibratorSound
      activated
    }
  }
`;

const DEACTIVATE_ALARM = gql`
  mutation DeactivateAlarm($id: String!) {
    deactivateAlarm(id: $id) {
      _id
      name
      triggeredDate
      alarmSound
      vibratorSound
      activated
    }
  }
`;

export const useCreateAccount = () => {
  return useMutation(CREATE_ACCOUNT);
};

export const useCreateAlarm = () => {
  return useMutation(CREATE_ALARM);
};

export const useGetAccounts = () => {
  return useQuery(GET_ACCOUNTS);
};

export const useGetAlarms = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALARMS);
  return { loading, error, data, refetch };
};

export const useGetAlarm = (alarmId:string) => {
  const { loading, error, data, refetch } = useQuery(GET_ALARM, {
    variables: { alarmId },
  });

  return { loading, error, alarm: data?.alarm, refetch };
};

export const useUpdateAlarm = () => {
  return useMutation(UPDATE_ALARM);
};

export const useDeleteAlarm = () => {
  return useMutation(DELETE_ALARM);
};

export const useActivateAlarm = () => {
  return useMutation(ACTIVATE_ALARM);
};

export const useDeactivateAlarm = () => {
  return useMutation(DEACTIVATE_ALARM);
};