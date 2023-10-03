class PlayerSprite extends BaseSprite {
    
    public heldItem: Sprite = null;

    constructor() {
        super(assets.image`cook`, SpriteKind.Player);
    }

    public pickupItem(sprite: Sprite): void {
        this.heldItem = sprite;
        this.heldItem.z = 5;
    }

    public dropItem(): void {
        this.heldItem.z = -1;
        this.heldItem = null;
    }

    public destroyItem(): void {
        this.heldItem.destroy();
        this.heldItem = null;
    }

    public carryItem(): void{
        if(this.heldItem) {
            this.heldItem.setPosition(this.sprite.x, this.sprite.y);
            this.heldItem.z = 5
        }
    }
}
