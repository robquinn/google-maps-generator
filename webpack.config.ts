import * as dotenv from 'dotenv'
import HandlebarsPlugin from 'handlebars-webpack-plugin'
import * as _ from 'lodash'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack' // only add this if you don't have yet
import WebpackObfuscator from 'webpack-obfuscator'
import getMapName from './src/ts/map/get-map-name'
import getMapsArr from './src/ts/map/get-maps-arr'
import trimSpaceBetweenWords from './src/ts/utils/trim-space-between-words'

dotenv.config({ path: './.env' })

const mapNumbers = getMapsArr()
const mapNames: Map.Name[] = mapNumbers.map((mapNum) => getMapName(mapNum))

const getHandlebarsCombinedData = (): Handlebars.Data => {
  const areasData:
    | Record<Partial<Map.Name>, Map.Area[]>
    | Record<string, Map.Area[]> = {}
  mapNames.forEach((mapName) => {
    areasData[mapName] = getMapData(mapName).areas
  })
  const data = { areas: areasData, maps: mapNames }
  return data
}

const getMapData = (mapName: string): Map.Areas => {
  // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
  return require(`./src/data/${mapName}/areas.json`) as Map.Areas
}

// const entryName = `${
//   mapsEnum.get(parseInt(process.env.MAP_NUMBER as string, 10)) as string
// }-map`

const entryName = 'map'

const config = {
  name: 'GOOGLE MAPS GENERATOR',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  entry: {
    [entryName]: './src/ts/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'this',
  },
  mode: 'production',
  // devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            // options: {
            //   additionalData: `@use 'light-theme/vars' as vars;`,
            // },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // disable creating additional chunks
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new MiniCssExtractPlugin(),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', 'hbs', '*.hbs'),
      output: path.join(process.cwd(), 'dist', `index.html`),
      data: getHandlebarsCombinedData(),
      partials: [path.join(process.cwd(), 'src', 'hbs', 'components', '*.hbs')],
      helpers: {
        googleMapsApiKey: (): string =>
          process.env.GOOGLE_MAPS_API_KEY as string,
        webpackEntryName: (): string => entryName,
        transformMapName: (mapName: string): string => _.startCase(mapName),
        dyanmicObjectLookup: (obj: Handlebars.Areas, key: Map.Name): unknown =>
          obj[key],
        maps: (): Map.Name[] => mapNames,
        concat: (context, arg1, arg2, arg3, arg4, arg5, options): string =>
          [context, arg1, arg2, arg3, arg4, arg5]
            .filter((val) => val != null && typeof val === 'string')
            .reduce(
              (str: string, piece: string) => str.concat(piece),
              ''
            ) as string,
        trim: (str: string): string => trimSpaceBetweenWords(str),
      },
    }),
    new WebpackObfuscator({}),
  ],
}

export default config
