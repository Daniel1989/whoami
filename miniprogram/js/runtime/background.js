import Sprite from '../base/sprite'


const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg.jpg'
const BG_WIDTH     = 512
const BG_HEIGHT    = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx, db) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 0
    this.db = db

    this.render(ctx)
    
  }

  update() {
    this.top += 2

    if ( this.top >= screenHeight )
      this.top = 0
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  async render(ctx) {
    const result = await wx.cloud.callFunction({
      name: 'callQwen',
      data: {
        question: "who are you",
      },
    })
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff'
    ctx.font = '40px Arial'

    ctx.fillText(
      result.result,
      0,
      screenHeight / 2 - 100 + 50
    )
  }
}
