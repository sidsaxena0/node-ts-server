import cors from 'cors';
import express from 'express';
import http from 'http';
import 'dotenv/config';
import registerRoutes from "./routes/routes";
import addErrorHandler from "./middleware/error-handler";

export default class App {
  public express: express.Application;

  public httpServer: http.Server;

  public async init(): Promise<void> {
    const { NODE_ENV } = process.env;
    this.express = express();
    this.httpServer = http.createServer(this.express);
    // add all global middleware like cors
    this.middleware();

    // register the all routes
    this.routes();
    // add the middleware to handle error
    this.express.use(addErrorHandler);
  }

  /**
   * here register your all routes
   */
  private routes(): void {
    this.express.use('/', registerRoutes());
  }

  /**
   * here you can apply your middlewares
   */
  private middleware(): void {
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(
      express.urlencoded({ limit: '100mb', extended: true }),
    );
    // add multiple cors options as per your use
    const corsOptions = {
      origin: [
        'http://localhost:8080/',
        'http://example.com/',
        'http://127.0.0.1:8080',
      ],
    };
    this.express.use(cors(corsOptions));
  }

  private parseRequestHeader(
    req: express.Request,
    res: express.Response,
    next: Function,
  ): void {
    // parse request header
    // console.log(req.headers.access_token);
    next();
  }
}
