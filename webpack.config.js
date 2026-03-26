// webpack.config.js
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    // Точка входа
    entry: "./src/index.js",

    // Выходная папка и имя файла
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true, // Очищать dist перед сборкой
      assetModuleFilename: "assets/[name].[hash][ext]", // Для изображений
    },

    // Поддержка ES модулей в конфиге
    experiments: {
      outputModule: false, // Важно: для HtmlWebpackPlugin нужно оставить false
    },

    // Режим: development/production
    mode: isProduction ? "production" : "development",

    // Source maps для отладки
    devtool: isProduction ? "source-map" : "eval-source-map",

    // Локальный сервер для разработки
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 8080,
      hot: true, // Hot Module Replacement
      open: true, // Открыть браузер автоматически
      historyApiFallback: true,
    },

    // Модули и правила обработки файлов
    module: {
      rules: [
        // Обработка SCSS → CSS
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        // Обработка обычных CSS
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Обработка изображений (иконки карт)
        {
          test: /\.(png|jpe?g|svg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "img/[name][ext]", // Сохранять в dist/img/
          },
        },
        // Шрифты (опционально)
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
      ],
    },

    // Плагины
    plugins: [
      // Генерация index.html с подключённым bundle.js
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        minify: isProduction,
      }),
      // Копирование статических файлов (если есть папка public/)
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/img",
            to: "img",
            noErrorOnMissing: true, // Не падать, если папки нет
          },
        ],
      }),
    ],

    // Разрешённые расширения для импортов
    resolve: {
      extensions: [".js", ".json"],
    },
  };
};
