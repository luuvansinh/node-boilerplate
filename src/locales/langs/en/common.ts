import key from '../../key'

const { common } = key

// 1 -> 100
export default {
  [common.success]: 'Success',
  [common.apiNotFound]: 'Api not found',
  [common.invalidParams]: 'Invalid params',
  [common.serverError]: 'Server error',
  [common.tokenVerifyFailed]: 'Session expired, please login again!',
  [common.dataAlreadyExisted]: 'This data already exists in the system.',
  [common.requireAuth]: 'You must be logged in to perform this action.',
  [common.dataNotFound]: 'Not found.',
  [common.noPermission]: 'You have no permission for this action.',
  [common.loginFailed]: 'Phone or password is incorrect.',
  [common.passwordRequired]: 'Password is required.',
  [common.bannedAccount]: 'Your account have been banned.',
  [common.oldPasswordRequired]: 'Old password is required',
  [common.newPasswordRequired]: 'New password is required',
  [common.wrongPassword]: 'Wrong password',
  [common.fileNotFound]: 'File not found',
  [common.fileRequired]: 'File id is required',
}
