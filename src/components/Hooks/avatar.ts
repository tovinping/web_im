import {useRootState} from 'src/store'
export function useContactAvatar(account: string) {
  const avatarUrl = useRootState(state => state.avatar[account])
  return avatarUrl
}

export function useGroupAvatar(groupId: string) {
  const groupInfo = useRootState(state => state.group[groupId])
  return groupInfo?.avatar || ''
}