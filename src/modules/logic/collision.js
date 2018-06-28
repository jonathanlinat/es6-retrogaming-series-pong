export default class Collision {
  checkEdgeOverlapping (minA = 0, maxA = 0, minB = 0, maxB = 0) {
    // Check if an edge of an object is overlapping the opposite one of an other object.
    return Math.max(minA, maxA) >= Math.min(minB, maxB) && Math.min(minA, maxA) <= Math.max(minB, maxB)
  }

  getEdgeOverlappingDistance (minA = 0, maxA = 0, minB = 0, maxB = 0) {
    // Return the result of the subtraction between minimum and maximum value (position XY on canvas) of two objects.
    return Math.max(minA, maxA) - Math.min(minB, maxB) || Math.min(minA, maxA) - Math.max(minB, maxB)
  }

  detect (collider = {}, collided = {}) {
    const edgeOverlappingX = this.checkEdgeOverlapping(collider.left, collider.right, collided.left, collided.right)
    const edgeOverlappingY = this.checkEdgeOverlapping(collider.top, collider.bottom, collided.top, collided.bottom)
    const edgeOverlappinDistanceX = this.getEdgeOverlappingDistance(collider.left, collider.right, collided.left, collided.right)
    const edgeOverlappinDistanceY = this.getEdgeOverlappingDistance(collider.top, collider.bottom, collided.top, collided.bottom)

    if (edgeOverlappingX && edgeOverlappingY) {
      // Check if X and Y edges are colliding, determine which edge was first collided and then tweak the collider's velocity in consequence.
      if (edgeOverlappinDistanceX <= edgeOverlappinDistanceY) collider.velocityX = -collider.velocityX
      if (edgeOverlappinDistanceX >= edgeOverlappinDistanceY) collider.velocityY = -collider.velocityY
    }
  }
}
