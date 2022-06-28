import { Hash256, Logger, UnixTime } from '@l2beat/common'

import { BaseRepository } from './shared/BaseRepository'
import { Database } from './shared/Database'

export class ReportStatusRepository extends BaseRepository {
  constructor(database: Database, logger: Logger) {
    super(database, logger)

    /* eslint-disable @typescript-eslint/unbound-method */

    this.getByConfigHash = this.wrapGet(this.getByConfigHash)
    this.add = this.wrapAdd(this.add)
    this.deleteAll = this.wrapDelete(this.deleteAll)

    /* eslint-enable @typescript-eslint/unbound-method */
  }

  async getByConfigHash(configHash: Hash256): Promise<UnixTime[]> {
    const knex = await this.knex()
    const rows = await knex('report_status')
      .where({ config_hash: configHash.toString() })
      .select('unix_timestamp')

    return rows.map((r) => new UnixTime(+r.unix_timestamp))
  }

  async add(record: {
    configHash: Hash256
    timestamp: UnixTime
  }): Promise<Hash256> {
    const knex = await this.knex()
    await knex('report_status')
      .insert({
        config_hash: record.configHash.toString(),
        unix_timestamp: record.timestamp.toString(),
      })
      .onConflict(['config_hash', 'unix_timestamp'])
      .merge()
    return record.configHash
  }

  async deleteAll() {
    const knex = await this.knex()
    return await knex('report_status').delete()
  }
}
