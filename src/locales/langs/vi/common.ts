import key from '../../key'

const { common } = key

// 1 -> 100
export default {
  [common.success]: 'Thành công.',
  [common.apiNotFound]: 'Api không tìm thấy',
  [common.invalidParams]: 'Dữ liệu không hợp lệ',
  [common.serverError]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [common.tokenVerifyFailed]: 'Session expired, please login again!',
  [common.dataAlreadyExisted]: 'Dữ liệu đã tồn tại',
  [common.requireAuth]: 'Bạn phải đăng nhập để thực hiện hành động này.',
  [common.dataNotFound]: 'Không tìm thấy.',
  [common.noPermission]: 'Bạn không có quyền thực hiện hành động này.',
  [common.loginFailed]: 'SĐT hoặc mật khẩu không đúng.',
  [common.passwordRequired]: 'Mật khẩu không được trống.',
  [common.bannedAccount]: 'Tài khoản của bạn đã bị khóa.',
  [common.oldPasswordRequired]: 'Mật khẩu cũ không được trống',
  [common.newPasswordRequired]: 'Mật khẩu mới không được trống',
  [common.wrongPassword]: 'Mật khẩu không đúng',
  [common.fileNotFound]: 'File không tìm thấy',
  [common.fileRequired]: 'File id không được trống',
}
