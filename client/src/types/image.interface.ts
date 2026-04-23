import { HostType, IHost } from "./host.interface"
import { Iroom } from "./room.interface"
import { IRoomType } from "./roomtype.interface"
export type IImage = {
    id: number,
    url: string | '',
    roomTypeId?: number,
    rooms?: IRoomType
    hostid?: number,
    hohsts?: HostType

}

