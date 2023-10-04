class Conveyor extends BaseSprite {
    private carriedDish: Sprite = null;
    
    constructor(location: tiles.Location) {
        super(assets.image`conveyor`, SpriteKind.Conveyor);
        this.sprite.z = -1;
        tiles.placeOnTile(this.sprite, location);
        animation.runImageAnimation(this.sprite, assets.animation`conveyor belt`, 200, true);
    }

    public placeDish(sprite: Sprite): void {
        this.carriedDish = sprite;
        this.carriedDish.setPosition(this.sprite.x, this.sprite.y);
        this.carriedDish.z = 0;
    }

    public carryDish(): void {
        this.carriedDish.x += 2;
    }
}
