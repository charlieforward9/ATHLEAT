import { post } from "aws-amplify/api";
import { AuthBody } from "./types";

export abstract class IntegrationService {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  abstract authenticate(body: AuthBody): Promise<any>;
  abstract fetch(body: any): Promise<any>;
}
