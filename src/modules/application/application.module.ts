import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [NotificationModule, ContactModule, FaqModule, PostModule],
})
export class ApplicationModule {}
