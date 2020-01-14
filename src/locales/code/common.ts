import key from '../key'

const { common } = key

// 1 -> 100
export default {
  [common.success]: 1,
  [common.apiNotFound]: 2,
  [common.invalidParams]: 3,
  [common.serverError]: 4,
  [common.tokenVerifyFailed]: 5,
  [common.dataAlreadyExisted]: 6,
  [common.requireAuth]: 7,
  [common.dataNotFound]: 8,
  [common.noPermission]: 9,
  [common.loginFailed]: 10,
  [common.passwordRequired]: 11,
  [common.bannedAccount]: 12,
  [common.oldPasswordRequired]: 13,
  [common.newPasswordRequired]: 14,
  [common.wrongPassword]: 15,
  [common.fileNotFound]: 16,
  [common.fileRequired]: 17,
}
