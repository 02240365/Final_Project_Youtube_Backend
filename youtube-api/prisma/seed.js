const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clear existing data
  await prisma.playlistVideo.deleteMany({});
  await prisma.playlist.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.channel.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Existing data cleared');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'john@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Content creator passionate about technology',
      country: 'United States',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'janedoe',
      email: 'jane@example.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Doe',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      bio: 'Music lover and video creator',
      country: 'Canada',
    },
  });

  console.log('Users created');

  // Create channels
  const channel1 = await prisma.channel.create({
    data: {
      name: 'TechWithJohn',
      description: 'Latest tech reviews and tutorials',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      banner: 'https://picsum.photos/1200/300',
      customUrl: 'techwithjohn',
      userId: user1.id,
    },
  });

  const channel2 = await prisma.channel.create({
    data: {
      name: 'JanesMusicWorld',
      description: 'Music covers and original songs',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      banner: 'https://picsum.photos/1200/300',
      customUrl: 'janesmusicworld',
      userId: user2.id,
    },
  });

  console.log('Channels created');

  // Create videos
  const video1 = await prisma.video.create({
    data: {
      title: 'Top 10 Smartphones of 2023',
      description: 'A comprehensive review of the best smartphones released this year',
      thumbnail: 'https://picsum.photos/640/360',
      videoUrl: 'https://example.com/videos/smartphones-2023.mp4',
      duration: 1200, // 20 minutes
      category: 'Technology',
      tags: ['smartphones', 'tech', 'review'],
      channelId: channel1.id,
      userId: user1.id,
    },
  });

  const video2 = await prisma.video.create({
    data: {
      title: 'How to Build a PC - Step by Step Guide',
      description: 'Complete tutorial on building your own gaming PC from scratch',
      thumbnail: 'https://picsum.photos/640/360',
      videoUrl: 'https://example.com/videos/pc-build-guide.mp4',
      duration: 1800, // 30 minutes
      category: 'Technology',
      tags: ['pc', 'gaming', 'tutorial'],
      channelId: channel1.id,
      userId: user1.id,
    },
  });

  const video3 = await prisma.video.create({
    data: {
      title: 'Cover - Bohemian Rhapsody',
      description: 'My acoustic cover of Queen\'s Bohemian Rhapsody',
      thumbnail: 'https://picsum.photos/640/360',
      videoUrl: 'https://example.com/videos/bohemian-rhapsody-cover.mp4',
      duration: 360, // 6 minutes
      category: 'Music',
      tags: ['cover', 'queen', 'acoustic'],
      channelId: channel2.id,
      userId: user2.id,
    },
  });

  console.log('Videos created');

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Great video! Very informative.',
      videoId: video1.id,
      userId: user2.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: 'I disagree with your ranking, the XYZ phone should be higher!',
      videoId: video1.id,
      userId: user2.id,
    },
  });

  const reply1 = await prisma.comment.create({
    data: {
      content: 'Thanks for your feedback! It was a close call between those models.',
      videoId: video1.id,
      userId: user1.id,
      parentId: comment2.id,
    },
  });

  console.log('Comments created');

  // Create subscriptions
  const subscription1 = await prisma.subscription.create({
    data: {
      userId: user2.id,
      channelId: channel1.id,
      notificationEnabled: true,
    },
  });

  const subscription2 = await prisma.subscription.create({
    data: {
      userId: user1.id,
      channelId: channel2.id,
      notificationEnabled: false,
    },
  });

  console.log('Subscriptions created');

  // Create playlists
  const playlist1 = await prisma.playlist.create({
    data: {
      title: 'Tech Reviews',
      description: 'Collection of my best tech review videos',
      userId: user1.id,
      videos: {
        create: [
          {
            video: { connect: { id: video1.id } },
            position: 1,
          },
          {
            video: { connect: { id: video2.id } },
            position: 2,
          },
        ],
      },
    },
  });

  const playlist2 = await prisma.playlist.create({
    data: {
      title: 'My Covers',
      description: 'All my music covers in one playlist',
      userId: user2.id,
      videos: {
        create: [
          {
            video: { connect: { id: video3.id } },
            position: 1,
          },
        ],
      },
    },
  });

  console.log('Playlists created');

  console.log('Database seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });