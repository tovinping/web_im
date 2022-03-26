import {useRootState} from 'src/store'
export function useContactAvatar(account: string) {
  const avatarUrl = useRootState(state => state.user.map[account]?.avatar)
  return avatarUrl || ''
}

export function useGroupAvatar(groupId: string) {
  const groupInfo = useRootState(state => state.group.map[groupId])
  return groupInfo?.avatar || ''
}