import type { ServerStatusData } from './../types';
const useServerStatus = () => {
  const servers = ['euw1', 'eun1', 'na1', 'kr', 'jp1', 'br1', 'tr1', 'ru', 'la1', 'la2', 'oc1'];
  const status = ref<ServerStatusData[]>([])

  const getServerStatus = () => {
    const tempData = ref<ServerStatusData[]>([])
    Promise.allSettled(
      servers.map(async (server) => {
        fetch(`${import.meta.env.VITE_URL}/api/get-server-status/${server}`)
          .then(res => res.json() as Promise<ServerStatusData>)
          .then(data => tempData.value.push(data))
          .catch(err => console.error(err))
      }))
      .then(() => status.value = tempData.value)
      .catch(err => console.error(err))
  }

  getServerStatus()

  return {
    status
  }
}

export default useServerStatus