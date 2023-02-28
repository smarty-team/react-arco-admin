import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  Query,
  Res,
  Scope,
  UseGuards,
  HttpStatus,

} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import * as Mock from 'mockjs';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('数据统计')
@Controller('workplace')
export class AnalyticsController {
  constructor() { }

  @ApiOperation({
    summary: 'Content Data',
  })
  @Get('/overview-content')
  async overview_content() {
    const year = new Date().getFullYear();
    const getLineData = () => {
      return new Array(12).fill(0).map((_item, index) => ({
        date: `${year}-${index + 1}`,
        count: Mock.Random.natural(2000, 75000),
      }));
    };
    return {
      allContents: '666.6w+',
      liveContents: '368',
      increaseComments: '8874',
      growthRate: '2.8%',
      chartData: getLineData(),
    }
  }

  @ApiOperation({
    summary: '/popular-contents',
  })
  @Get('/popular-contents')
  async popular_contents() {
    const
      page = 1,
      pageSize = 5,
      category = 0;

    // = qs.parseUrl(params.url).query as unknown as {
    //   page?: number;
    //   pageSize?: number;
    //   category?: number;
    // };

    const list = [this.listText, this.listPic, this.listVideo][Number(category)];
    return {
      list: list.slice((page - 1) * pageSize, page * pageSize),
      total: 100,
    };
  }

  @ApiOperation({
    summary: 'Percentage of content categories',
  })
  @Get('/content-percentage')
  async content_percentages() {
    return [
      {
        type: '纯文本',
        count: 148564,
        percent: 0.16,
      },
      {
        type: '图文类',
        count: 334271,
        percent: 0.36,
      },
      {
        type: '视频类',
        count: 445695,
        percent: 0.48,
      },
    ];
  }

  @ApiOperation({
    summary: 'Announcement',
  })
  @Get('/announcement')
  async announcement() {
    return [
      {
        type: 'activity',
        key: '1',
        content: '内容最新优惠活动',
      },
      {
        type: 'info',
        key: '2',
        content: '新增内容尚未通过审核，详情请点击查看。',
      },
      {
        type: 'notice',
        key: '3',
        content: '当前产品试用期即将结束，如需续费请点击查看。',
      },
      {
        type: 'notice',
        key: '4',
        content: '1 月新系统升级计划通知',
      },
      {
        type: 'info',
        key: '5',
        content: '新增内容已经通过审核，详情请点击查看。',
      },
    ];
  }

  getList = () => {
    const { list } = Mock.mock({
      'list|100': [
        {
          'rank|+1': 1,
          title: () =>
            Mock.Random.pick([
              '经济日报：财政政策要精准提升效能',
              '“双12”遇冷消费者厌倦了电商平台的促销“套路”',
              '致敬坚守战“疫”一线的社区工作者',
              '普高还是职高？家长们陷入选校难题',
            ]),
          pv: function () {
            return 500000 - 3200 * this.rank;
          },
          increase: '@float(-1, 1)',
        },
      ],
    });
    return list;
  };
  listText = this.getList();
  listPic = this.getList();
  listVideo = this.getList();



}
