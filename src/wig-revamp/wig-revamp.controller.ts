import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { WigRevampService } from './wig-revamp.service';
import { CreateWigRevampRequestDto, UpdateWigRevampRequestDto } from './wig-revamp.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wig-revamp-requests')
export class WigRevampController {
  constructor(private wigRevampService: WigRevampService) {}

  // POST /wig-revamp-requests - public, customers submit their wig for assessment
  // (accepts up to 5 photos of the wig, field name "images")
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  create(
    @Body() dto: CreateWigRevampRequestDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const buffers = (images || []).map((f) => f.buffer);
    return this.wigRevampService.create(dto, buffers);
  }

  // GET /wig-revamp-requests/admin - the queue she manages
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllForAdmin() {
    return this.wigRevampService.findAllForAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wigRevampService.findOne(id);
  }

  // PATCH /wig-revamp-requests/:id - update status/pricing as the request progresses
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWigRevampRequestDto) {
    return this.wigRevampService.update(id, dto);
  }
}
