import { DescriptionPlotModel } from '#models/index.js'
import { type QueryResolvers } from '#graphql/generated/types.js'

export const DescriptionPlotQuery: QueryResolvers = {
  getOneBookPlot: async (_, args) => {
    const { bookID } = args
    try {
      const [book] = await DescriptionPlotModel.find({ bookID })
      return book
    } catch (error) {
      throw new Error('Couldn`t get book')
    }
  },
}
