import { ServerStatusData } from './../types';
const useServerStatus = () => {
  const servers = ['euw1', 'eun1', 'na1', 'kr', 'jp1', 'br1', 'tr1', 'ru', 'la1', 'la2', 'oc1'];
  const status = ref<ServerStatusData[]>([])

  const getServerStatus = async () => {
    const tempData = ref<ServerStatusData[]>([])
    await Promise.allSettled(
      servers.map(async (server) => {
        fetch(`${import.meta.env.VITE_URL}/api/get-server-status/${server}`)
          .then(res => res.json() as Promise<ServerStatusData>)
          .then(data => tempData.value.push(data))
      }))
    status.value = tempData.value
  }

  getServerStatus()

  return {
    status
  }
}

export default useServerStatus