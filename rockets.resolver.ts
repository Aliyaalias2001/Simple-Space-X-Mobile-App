import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Resolver()
export class RocketResolver {
  constructor(private httpService: HttpService) {}

  @Query('rockets')
  async getRockets(): Promise<any[]> {
    const response: AxiosResponse = await this.httpService
      .get('https://api.spacexdata.com/v3/rockets')
      .toPromise();
    return response.data;
  }

  @Mutation('createRocket')
  async createRocket(@Args('input') input: any): Promise<any> {
    const response: AxiosResponse = await this.httpService
      .post('https://api.spacexdata.com/v3/rockets', input)
      .toPromise();
    return response.data;
  }

  @Mutation('updateRocket')
  async updateRocket(@Args('input') input: any): Promise<any> {
    const response: AxiosResponse = await this.httpService
      .patch(`https://api.spacexdata.com/v3/rockets/${input.id}`, input)
      .toPromise();
    return response.data;
  }

  @Mutation('deleteRocket')
  async deleteRocket(@Args('id') id: string): Promise<boolean> {
    await this.httpService
      .delete(`https://api.spacexdata.com/v3/rockets/${id}`)
      .toPromise();
    return true;
  }
}
