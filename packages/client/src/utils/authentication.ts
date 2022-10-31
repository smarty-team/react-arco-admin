/**
 * { data-analysis:  ['read', 'write'] }
 */

export type UserPermission = Record<string, string[]>;

type Auth = {
  resource: string | RegExp;
  actions?: string[];
};

export interface AuthParams {
  requiredPermissions?: Array<Auth>;
  oneOfPerm?: boolean;
}

const judge = (actions: string[], perm: string[]) => {
  if (!perm || !perm.length) {
    return false;
  }

  if (perm.join('') === '*') {
    return true;
  }

  return actions.every((action) => perm.includes(action));
};

// 鉴权：params是要求权限，包括resource和action；userPermission是用户拥有的权限
const auth = (params: Auth, userPermission: UserPermission) => {
  const { resource, actions = [] } = params;
  // resource是正则的情况
  if (resource instanceof RegExp) {
    // 获取用户权限的所有key
    const permKeys = Object.keys(userPermission);
    // 过滤用户权限中是否有匹配项
    const matchPermissions = permKeys.filter((item) => item.match(resource));
    if (!matchPermissions.length) {
      return false;
    }
    // 如果有匹配项
    return matchPermissions.every((key) => {
      const perm = userPermission[key];
      return judge(actions, perm);
    });
  }

  const perm = userPermission[resource];
  return judge(actions, perm);
};

// 鉴权过程：params是资源要求的权限，userPermission是用户拥有的权限
export default (params: AuthParams, userPermission: UserPermission) => {
  // 资源要求权限可能有多个，包含在requiredPermissions中
  // 如果设置了oneOfPerm，则满足其中任意一个即可鉴权成功
  const { requiredPermissions, oneOfPerm } = params;
  if (Array.isArray(requiredPermissions) && requiredPermissions.length) {
    let count = 0;
    for (const rp of requiredPermissions) {
      // 执行单个鉴权
      if (auth(rp, userPermission)) {
        count++;
      }
    }
    return oneOfPerm ? count > 0 : count === requiredPermissions.length;
  }
  return true;
};
