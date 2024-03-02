import { Op } from 'sequelize'
import { UserModel } from '../models/user'

interface IsSuperAdminType {
  userId: string
}

export const isSuperAdmin = async ({ userId }: IsSuperAdminType): Promise<boolean> => {
  const checkAdmin = await UserModel.findOne({
    raw: true,
    where: {
      deleted: { [Op.eq]: 0 },
      userId: { [Op.eq]: userId },
      userRole: { [Op.eq]: 'superAdmin' }
    }
  })
  return checkAdmin != null
}
