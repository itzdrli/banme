import { Context, Schema, Random } from 'koishi'

export const name = 'banme'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context,config: Config) {
  ctx.command('banme', 'Ban yourself for a random time').action(async ({ session }) => {
    const random = new Random(() => Math.random())
    let banTime = random.int(60000, 43200000)
    banTime = Math.floor(banTime / 1000) * 1000
    ctx.logger('banme').info(`Banned ${session.userId} for ${banTime}ms`)
    await session.bot.muteGuildMember(session.guildId, session.userId, banTime)
    const rly = banTime / 1000
    return `已禁言抖M ${session.username} ${rly} 秒`
  })
}
