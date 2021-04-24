import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // 👇 import VPC by Name
    const myVpc = ec2.Vpc.fromLookup(this, 'rds-vpc', {
      isDefault: true,
    });

    console.log('vpcId 👉 ', myVpc.vpcId);
    console.log('vpcCidrBlock 👉 ', myVpc.vpcCidrBlock);

    const myFunction = new NodejsFunction(this, 'my-function', {
      // 👇 place Lambda in VPC
      vpc: myVpc,
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-lambda/index.js`),
    });
  }
}
